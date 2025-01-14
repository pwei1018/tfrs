/*
 * Presentational component
 */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import Loading from '../../app/components/Loading';
import history from '../../app/History';
import * as Lang from '../../constants/langEnUs';
import PERMISSIONS_USERS from '../../constants/permissions/Users';
import { USERS as ADMIN_USERS } from '../../constants/routes/Admin';
import USERS from '../../constants/routes/Users';

import UserHistoryTable from './UserHistoryTable';

const UserDetails = props => (
  <div className="page_user">
    {props.user.isFetching && <Loading />}
    {!props.user.isFetching &&
      <div>
        <div className="user_actions">
          <div className="btn-container">
            {props.loggedInUser.hasPermission(PERMISSIONS_USERS.USER_MANAGEMENT) &&
            <button
              className="btn btn-primary"
              onClick={() => {
                let editUrl = USERS.EDIT.replace(':id', props.user.details.id);

                if (document.location.pathname.indexOf('/admin/') >= 0) {
                  editUrl = ADMIN_USERS.EDIT.replace(':id', props.user.details.id);
                }

                history.push(editUrl);
              }}
              type="button"
              id="edit-user"
            >
              <FontAwesomeIcon icon="pencil-alt" /> {Lang.BTN_EDIT}
            </button>
            }
          </div>
        </div>
        <h1>
          {`${props.user.details.firstName} ${props.user.details.lastName}`}
        </h1>
        {props.user.details.organization &&
          <div>Company:
            <strong> {props.user.details.organization.name}</strong>
          </div>
        }
        <div>Email:
          <strong> {props.user.details.email}</strong>
        </div>
        <div>Work Phone:
          <strong> {props.user.details.phone || '-'}</strong>
        </div>
        <div>Mobile Phone:
          <strong> {props.user.details.cellPhone || '-'}</strong>
        </div>
        <div>Status:
          <strong> {props.user.details.isActive ? 'Active' : 'Inactive'}</strong>
        </div>
        {props.user.details.roles &&
          <div>Role:
            <strong> {props.user.details.roles.map(role => role.description).join(', ')}
            </strong>
          </div>
        }
        <div>Title:
          <strong> {props.user.details.title}</strong>
        </div>
        <div className="user_history">
          <h3>User Activity</h3>
          {props.user.details.id &&
            <UserHistoryTable userId={props.user.details.id} />
          }
        </div>
      </div>
    }
    <div className="btn-container">
      <button
        className="btn btn-default"
        onClick={() => history.goBack()}
        type="button"
      >
        <FontAwesomeIcon icon="arrow-circle-left" /> {Lang.BTN_APP_CANCEL}
      </button>
    </div>
  </div>
);

UserDetails.propTypes = {
  loggedInUser: PropTypes.shape({
    hasPermission: PropTypes.func
  }).isRequired,
  user: PropTypes.shape({
    details: PropTypes.shape({
      cellPhone: PropTypes.string,
      email: PropTypes.string,
      firstName: PropTypes.string,
      id: PropTypes.number,
      isActive: PropTypes.bool,
      lastName: PropTypes.string,
      organization: PropTypes.shape({
        name: PropTypes.string
      }),
      phone: PropTypes.string,
      roles: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number
      })),
      title: PropTypes.string
    }),
    errors: PropTypes.shape({}),
    isFetching: PropTypes.bool.isRequired
  }).isRequired
};

export default UserDetails;
