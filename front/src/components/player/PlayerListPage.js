// Import react and useEffect
import React, { useEffect, useState } from "react";
// Import useDispatch and useSelector and useState
import { useDispatch, useSelector } from "react-redux";

import { searchPlayersByNameAction } from "../../actions/playerActions";

import { Table, FlexboxGrid, IconButton, Icon } from "rsuite";
import TablePagination from "rsuite/lib/Table/TablePagination";

import Header from "../Header";
const { Column, HeaderCell, Cell, Pagination } = Table;

const PlayerListPage = () => {
  // get playersSearchByName using useSelector
  const playersSearchByName = useSelector(
    (state) => state.player.playersSearchByName
  );

  // get loading using useSelector
  const loading = useSelector((state) => state.loading);

  // expandedRowKeys useState
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const dispatch = useDispatch();

  // useEffect to call playerActions.searchPlayersByName
  useEffect(() => {
    dispatch(searchPlayersByNameAction("", "asc", 1));
  }, []);

  const rowKey = 'id';

  const handleChangePage = (dataKey) => {
    dispatch(searchPlayersByNameAction("", "asc", dataKey));
  };

  const handleExpanded = (rowData, dataKey) => {

    let open = false;
    let nextExpandedRowKeys = [];

    expandedRowKeys.forEach((key) => {
      if (key === rowData[rowKey]) {
        open = true;
      } else {
        nextExpandedRowKeys.push(key);
      }
    });

    if (!open) {
      nextExpandedRowKeys.push(rowData[rowKey]);
    }
    setExpandedRowKeys(nextExpandedRowKeys);
  };

  const ExpandCell = ({ rowData, dataKey, expandedRowKeys, onChange, ...props }) => (
    <Cell {...props}>
      <IconButton
        size="xs"
        appearance="subtle"
        onClick={() => {
          onChange(rowData);
        }}
        icon={
          <Icon
            icon={
              expandedRowKeys.some(key => key === rowData[rowKey])
                ? 'minus-square-o'
                : 'plus-square-o'
            }
          />
        }
      />
    </Cell>
  );

  const ImageCell = ({ dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
      <div
        style={{
          width: 40,
          height: 40,
          background: "#f5f5f5",
          borderRadius: 20,
          marginTop: 2,
          overflow: "hidden",
          display: "inline-block",
        }}
      >
        <img src={dataKey} width="40" />
      </div>
    </Cell>
  );

  return (
    <div>
      <Header />
      <div className="show-grid">
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={7}>
            <Table
              height={500}
              data={playersSearchByName?.Players}
              loading={loading}
              rowKey={rowKey}
              expandedRowKeys={expandedRowKeys}
              onRowClick={(data) => {
                console.log(data);
              }}
              renderRowExpanded={(rowData) => {
                return (
                  <div>
                    <p>{rowData.nation}</p>
                    <p>{rowData.team}</p>
                  </div>
                );
              }}
            >
              <Column width={70} align="center">
                <HeaderCell>#</HeaderCell>
                <ExpandCell
                  dataKey="id"
                  expandedRowKeys={expandedRowKeys}
                  onChange={handleExpanded}
                />
              </Column>

              <Column width={150} align="center">
                <HeaderCell>Photo</HeaderCell>
                <ImageCell dataKey="https://idiomasgratis.net/wp-content/uploads/avatars/24146/60ce469b50e5c-bpfull.jpg" />
              </Column>

              <Column width={130} align="center" fixed>
                <HeaderCell>Name</HeaderCell>
                <Cell dataKey="name" />
              </Column>

              <Column width={100} align="center">
                <HeaderCell>Position</HeaderCell>
                <Cell dataKey="position" />
              </Column>
            </Table>

            <TablePagination
              lengthMenu={[
                {
                  value: 10,
                  label: 10,
                },
                {
                  value: 20,
                  label: 20,
                },
              ]}
              activePage={playersSearchByName?.Page}
              displayLength={playersSearchByName?.Items}
              total={playersSearchByName?.totalItems}
              onChangePage={handleChangePage}
              next={true}
            />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
    </div>
  );
};
export default PlayerListPage;
