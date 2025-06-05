import React from 'react';
import { TideFragment } from '../../models/tide';

import { Table } from '@chakra-ui/react';

interface Props {
  rows: TideFragment[];
}

const TideTableDisplay: React.FC<Props> = ({ rows }) => {
  return (
    <Table.Root striped>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader></Table.ColumnHeader>
          <Table.ColumnHeader>Heure</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Hauteur (m)</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.index}>
            <Table.Cell>{row.label}</Table.Cell>
            <Table.Cell>{row.time}</Table.Cell>
            <Table.Cell textAlign="end">{Math.round(row.height * 100) / 100}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default TideTableDisplay;
