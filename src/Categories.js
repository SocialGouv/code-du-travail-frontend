import React from "react";
import { Link } from "../routes";

import {
  BreadCrumbs,
  Container,
  Categories
} from "@socialgouv/code-du-travail-ui";

import themes from "./data/themes2";

const Category = ({
  title,
  text,
  slug,
  icon = "/static/assets/icons/chat.svg"
}) => (
  <li className="categories__list-item" style={{ flexGrow: 0, minHeight: 120 }}>
    <Link route="theme" params={{ slug: slug || "/" }}>
      <a title={title}>
        <img src={icon} alt={title} />
        <h3>{title}</h3>
        {text}
      </a>
    </Link>
  </li>
);

class _Categories extends React.Component {
  render() {
    const { title, themes } = this.props;
    return (
      (themes.length && (
        <Container>
          {title && (
            <h2
              style={{ marginTop: 20, marginBottom: 40, textAlign: "center" }}
            >
              {title}
            </h2>
          )}
          <Categories style={{ justifyContent: "center" }}>
            {themes.map(theme => (
              <Category key={theme.slug + theme.title} {...theme} />
            ))}
          </Categories>
          <br />
          <br />
          <br />
        </Container>
      )) ||
      null
    );
  }
}

_Categories.defaultProps = {
  themes,
  title: "Retrouvez nos réponses thématiques"
};

export default _Categories;
