// Import react and useEffect
import React, { useEffect, useState } from "react";
// Import useDispatch and useSelector and useState
import { useDispatch, useSelector } from "react-redux";

import { searchPlayersByTeamAction } from "../../actions/playerActions";

import {
  Table,
  FlexboxGrid,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from "rsuite";
import TablePagination from "rsuite/lib/Table/TablePagination";

import Header from "../Header";
const { Column, HeaderCell, Cell } = Table;

const PlayerSearchByTeam = () => {
  // get playersSearchByName using useSelector
  const playersSearchByTeam = useSelector(
    (state) => state.player.playersSearchByTeam
  );
  // team useState
  const [team, setTeam] = useState({ team: "Real Madrid" });

  // get loading using useSelector
  const loading = useSelector((state) => state.loading);

  const dispatch = useDispatch();

  // useEffect to call playerActions.searchPlayersByName
  useEffect(() => {
    dispatch(searchPlayersByTeamAction(team.team, 1));
  }, []);

  const handleChangePage = (dataKey) => {
    dispatch(searchPlayersByTeamAction(team.team, dataKey));
  };

  function handleChange(value) {
    setTeam(value);
  }

  const onClick = () => {
    handleChangePage(1);
  };

  const SearchBar = ({ layout, ...props }) => (
    <Form onChange={handleChange} formValue={team} layout={layout}>
      <FormGroup>
        <ControlLabel>Team</ControlLabel>
        <FormControl name="team" autoFocus />
      </FormGroup>
      <Button onClick={onClick} appearance="primary">
        Find players
      </Button>
    </Form>
  );
  return (
    <div>
      <Header/>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={7}>
          <SearchBar layout="inline" />
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <div className="show-grid">
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={6}>
            <Table
              height={500}
              data={playersSearchByTeam?.Players}
              loading={loading}
            >
              <Column width={150} align="center" fixed>
                <HeaderCell>Name</HeaderCell>
                <Cell dataKey="name" />
              </Column>

              <Column width={130} align="center">
                <HeaderCell>Position</HeaderCell>
                <Cell dataKey="position" />
              </Column>

              <Column width={130} align="center">
                <HeaderCell>Nation</HeaderCell>
                <Cell dataKey="nation" />
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
              activePage={playersSearchByTeam?.Page}
              displayLength={playersSearchByTeam?.Items}
              total={playersSearchByTeam?.totalItems}
              onChangePage={handleChangePage}
              next={true}
            />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
    </div>
  );
};
export default PlayerSearchByTeam;
