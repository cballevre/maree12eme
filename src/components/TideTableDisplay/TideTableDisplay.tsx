import React from 'react';
import { TideFragment } from '../../models/tide';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

interface Props {
  rows: TideFragment[];
}

const TideTableDisplay: React.FC<Props> = ({ rows }) => {
  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Heure</Th>
            <Th isNumeric>Hauteur (m)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row) => (
            <Tr key={row.index}>
              <Td>{row.label}</Td>
              <Td>{row.time}</Td>
              <Td isNumeric>{Math.round(row.height * 100) / 100}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TideTableDisplay;
