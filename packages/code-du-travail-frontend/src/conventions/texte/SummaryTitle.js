import React from "react";
import PropTypes from "prop-types";
import SummaryItem from "./SummaryItem";
import { TocListItem, TocList, TocLink } from "./toc";

const SummaryTitle = ({
  type,
  data,
  children,
  expanded,
  onToggleExpanded,
  tocbotEnabled
}) => {
  const { id, titre } = data;

  if (!children || children.length == 0) {
    return (
      <TocListItem type={type} id={id} level={0}>
        <TitleLink type={type} id={id}>
          {titre}
        </TitleLink>
      </TocListItem>
    );
  }
  return (
    <TocListItem type={type} id={id} level={0}>
      <TitleLink
        id={id}
        type={type}
        onClick={e => {
          e.preventDefault();
          onToggleExpanded(id, !expanded);
        }}
      >
        {titre}&nbsp;{expanded ? "▲" : "▼"}
      </TitleLink>
      <TocList expanded={expanded}>
        {(expanded || tocbotEnabled) && // with tocbot, all DOM is required
          children.map((child, idx) => (
            <SummaryItem key={idx} level={1} {...child} expanded={expanded}>
              {child.children}
            </SummaryItem>
          ))}
      </TocList>
    </TocListItem>
  );
};

SummaryTitle.propTypes = {
  type: PropTypes.string,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    titre: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.array
    })
  ),
  expanded: PropTypes.bool,
  onToggleExpanded: PropTypes.func.isRequired
};

const TitleLink = ({ id, type, children, onClick }) => (
  <TocLink id={id} type={type} level={0} onClick={onClick}>
    {children}
  </TocLink>
);

export default SummaryTitle;
