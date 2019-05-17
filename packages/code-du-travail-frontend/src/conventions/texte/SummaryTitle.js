import React from "react";
import PropTypes from "prop-types";
import SummaryItem from "./SummaryItem";
import styled from "styled-components";

const SummaryTitle = ({ type, data, children, expanded, onToggleExpanded }) => {
  const { id, titre } = data;

  return (
    <Wrapper title={`${type} ${id}`}>
      <div>
        <Title>
          {children && children.length > 0 ? (
            <TitleLink
              href="#"
              onClick={e => {
                e.preventDefault();
                onToggleExpanded(id, !expanded);
              }}
            >
              {titre}&nbsp;{expanded ? "▲" : "▼"}
            </TitleLink>
          ) : (
            <TitleLink href={`#${id}`}>{titre}</TitleLink>
          )}
        </Title>
      </div>
      {expanded &&
        children.map((child, idx) => (
          <SummaryItem key={idx} level={0} {...child}>
            {child.children}
          </SummaryItem>
        ))}
    </Wrapper>
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

const Title = styled.h4`
  font-size: 14px;
`;

const TitleLink = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Wrapper = styled.div`
  clear: both;
`;

export default SummaryTitle;
