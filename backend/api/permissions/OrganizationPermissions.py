"""
    REST API Documentation for the NRS TFRS Credit Trading Application

    The Transportation Fuels Reporting System is being designed to streamline
    compliance reporting for transportation fuel suppliers in accordance with
    the Renewable & Low Carbon Fuel Requirements Regulation.

    OpenAPI spec version: v1

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
"""

from rest_framework import permissions


class OrganizationPermissions(permissions.BasePermission):
    """Used by Viewset to check permissions for API requests"""

    def has_permission(self, request, view):
        """Check permissions When an object does not yet exist (POST)"""

        # Fallback to has_object_permission unless it's a POST
        if request.method != 'POST':
            return True

        return request.user.has_perm('EDIT_FUEL_SUPPLIERS')

    def has_object_permission(self, request, view, obj):
        """Check permissions When an object does exist (PUT, GET)"""
        if request.user.has_perm('EDIT_FUEL_SUPPLIERS'):
            return True

        # Users can always see themselves
        if obj.id == request.user.id and \
                request.method in permissions.SAFE_METHODS:
            return True

        if request.method == 'GET' and \
                request.user.has_perm('VIEW_FUEL_SUPPLIERS'):
            return True

        # not authorized
        return False
