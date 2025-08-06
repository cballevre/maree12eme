import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from '@cballevre/kiwi-ui';

import type { TideFragment } from '@/models/tide';

interface Props {
  rows: TideFragment[];
}

const TideTableDisplay: React.FC<Props> = ({ rows }) => {
  return (
    <Table striped bordered>
      <TableHeader>
        <Column></Column>
        <Column isRowHeader>Heure</Column>
        <Column>Hauteur (m)</Column>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <Row key={row.index}>
            <Cell>{row.label}</Cell>
            <Cell>{row.time}</Cell>
            <Cell>{Math.round(row.height * 100) / 100}</Cell>
          </Row>
        ))}
      </TableBody>
    </Table>
  );
};

// textAlign="end"

export { TideTableDisplay };
