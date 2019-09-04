import React from "react";
import PropTypes from "prop-types";
import { Table as UITable } from "@cdt/ui-old";

import { ElementBuilder } from "./ElementBuilder";
import { ignoreParagraph, getText } from "../utils";

const ROW_HEADER = "header";

class Table extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    headingLevel: PropTypes.number.isRequired
  };
  render() {
    const { data, headingLevel } = this.props;

    const title = data.$.find(child => child.name === "Titre");
    const headingRows = data.$.filter(
      child => child.name === "Rangée" && child._.type === "header"
    );
    const rows = data.$.filter(
      child => child.name === "Rangée" && child._.type === "normal"
    );

    const columns = data.$.filter(child => child.name === "Colonne");
    const isHeaderCell = columnIndex => {
      return columns[columnIndex]._.type === ROW_HEADER;
    };

    const handleSpan = el => {
      let colSpan = 1;
      let rowSpan = 1;
      if (el._) {
        colSpan = el._.fusionHorizontale || 1;
        rowSpan = el._.fusionVerticale || 1;
      }
      return {
        colSpan,
        rowSpan
      };
    };

    return (
      <UITable>
        {title && <caption>{getText(title)}</caption>}
        {headingRows.length > 0 && (
          <thead>
            {headingRows.map((tr, rowIndex) => (
              <tr key={rowIndex}>
                {tr.$.map((th, columnIndex) => (
                  <th key={columnIndex} {...handleSpan(th)}>
                    {th.$ && (
                      <ElementBuilder
                        data={ignoreParagraph(th)}
                        headingLevel={headingLevel}
                      />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        )}
        <tbody>
          {rows.map((tr, rowIndex) => (
            <tr key={rowIndex}>
              {tr.$.map((td, columnIndex) => {
                const Cell = isHeaderCell(columnIndex) ? "th" : "td";
                if (!td.$) {
                  return <Cell />;
                }
                return (
                  <Cell key={columnIndex} {...handleSpan(td)}>
                    <ElementBuilder
                      data={ignoreParagraph(td)}
                      headingLevel={headingLevel + 1}
                    />
                  </Cell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </UITable>
    );
  }
}

export default Table;
