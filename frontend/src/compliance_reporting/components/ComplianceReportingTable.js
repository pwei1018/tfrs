/*
 * Presentational component
 */
import React from 'react';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';
import moment from 'moment';

import ReactTable from '../../app/components/StateSavingReactTable';
import CREDIT_TRANSACTIONS from "../../constants/routes/CreditTransactions";
import history from "../../app/History";
import COMPLIANCE_REPORTING from "../../constants/routes/ComplianceReporting";

const ComplianceReportingTable = (props) => {
  const columns = [{
    accessor: item => (item.organization ? item.organization.name : ''),
    className: 'col-organization',
    Header: 'Organization',
    id: 'organization',
    minWidth: 75,
    show: props.loggedInUser.isGovernmentUser
  }, {
    accessor: item => (item.type),
    className: 'col-type',
    Header: 'Type',
    id: 'type',
    minWidth: 75
  }, {
    accessor: item => (item.status),
    className: 'col-status',
    Header: 'Status',
    id: 'status',
    minWidth: 75
  },
    {
      accessor: item => (item.updateTimestamp ? moment(item.updateTimestamp).format('YYYY-MM-DD') : '-'),
      className: 'col-date',
      Header: 'Last Updated On',
      id: 'updateTimestamp',
      minWidth: 95
    }
  ];

  const filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined ? String(row[id])
      .toLowerCase()
      .includes(filter.value.toLowerCase()) : true;
  };

  const filterable = true;

  return (
    <ReactTable
      stateKey="compliance-reporting"
      className="searchable"
      columns={columns}
      data={props.items}
      defaultFilterMethod={filterMethod}
      defaultPageSize={10}
      defaultSorted={[{
        id: 'id',
        desc: true
      }]}
      loading={props.isFetching}
      filterable={filterable}
      getTrProps={(state, row) => {
        if (row && row.original) {
          return {
            onClick: (e) => {
              const viewUrl = COMPLIANCE_REPORTING.EDIT.replace(':id', row.original.id);

              history.push(viewUrl);
            },
            className: 'clickable'
          };
        }

        return {};
      }}
      pageSizeOptions={[5, 10, 15, 20, 25, 50, 100]}
    />
  );
};

ComplianceReportingTable.defaultProps = {};

ComplianceReportingTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    organization: PropTypes.shape({
      name: PropTypes.string
    }),
    status: PropTypes.string,
    type: PropTypes.string,

  })).isRequired,
  isEmpty: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  loggedInUser: PropTypes.shape({
    isGovernmentUser: PropTypes.bool
  }).isRequired
};

export default ComplianceReportingTable;
