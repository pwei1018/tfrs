from urllib.parse import urlsplit
import logging
from django.core.exceptions import ValidationError
from minio import Minio

from api.models.DocumentFileAttachment import DocumentFileAttachment
from api.models.DocumentHistory import DocumentHistory
from tfrs.settings import MINIO


class DocumentService(object):
    """
    Helper functions for Document Service
    """
    @staticmethod
    def create_history(document, is_new=False):
        """
        Create the Document History
        """
        user = (
            document.create_user
            if is_new
            else document.update_user)

        role_id = None

        if user.roles.filter(name="GovUser").exists():
            role_id = user.roles.get(name="GovUser").id
        elif user.roles.filter(name="FSDocSubmit").exists():
            role_id = user.roles.get(name="FSDocSubmit").id
        else:
            role_id = user.roles.first().id

        history = DocumentHistory(
            compliance_period_id=document.compliance_period_id,
            create_user=document.create_user,
            document_id=document.id,
            status_id=document.status.id,
            title=document.title,
            type_id=document.type.id,
            update_user=document.update_user
        )

        # Validate
        try:
            history.full_clean()
        except ValidationError as error:
            raise ValidationError(error)

        history.save()

    @staticmethod
    def delete_attachments(document_id, attachment_ids):
        """
        Sends a request to the minio instance to delete the files associated
        to the DocumentFile records related to the provided parameters
        """
        minio = Minio(MINIO['ENDPOINT'],
                      access_key=MINIO['ACCESS_KEY'],
                      secret_key=MINIO['SECRET_KEY'],
                      secure=MINIO['USE_SSL'])

        attachments = DocumentFileAttachment.objects.filter(
            document_id=document_id,  # additional security
            id__in=attachment_ids
        )

        object_names = map(DocumentService.get_filename, attachments)
        for error in minio.remove_objects(MINIO['BUCKET_NAME'], object_names):
            logging.error(error)

        attachments.update(
            is_removed=True
        )

    @staticmethod
    def get_filename(attachment):
        """
        This parses the url from DocumentFile and gets the filename that you
        can send to minio for deletion
        """
        pathname = urlsplit(attachment.url).path
        return pathname.replace('/{}/'.format(MINIO['BUCKET_NAME']), '')