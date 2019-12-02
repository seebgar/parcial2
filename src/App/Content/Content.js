import React from "react";
import axios from "axios";
import {
  FormattedDate,
  FormattedNumber,
  FormattedMessage,
  FormattedPlural
} from "react-intl";

import Detail from "./Detail";
import { injectIntl } from "react-intl";
import Graph from "./Graph";

const url_peliculas =
  "https://gist.githubusercontent.com/josejbocanegra/f784b189117d214578ac2358eb0a01d7/raw/2b22960c3f203bdf4fac44cc7e3849689218b8c0/data-es.json";
const url_movies =
  "https://gist.githubusercontent.com/josejbocanegra/8b436480129d2cb8d81196050d485c56/raw/48cc65480675bf8b144d89ecb8bcd663b05e1db0/data-en.json";

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      intl: props.intl.locale,
      peliculas: [],
      selected: undefined
    };

    this.get_peliculas = this.get_peliculas.bind(this);
    this.handleDetail = this.handleDetail.bind(this);
  }

  componentDidMount() {
    if (!navigator.onLine) {
      this.setState(_ => {
        return {
          peliculas: JSON.parse(localStorage.getItem("peliculas")) || [],
          selected: JSON.parse(localStorage.getItem("selected")) || {}
        };
      });
    }
    this.get_peliculas();
  }

  get_peliculas() {
    axios
      .get(this.state.intl === "es-ES" ? url_peliculas : url_movies)
      .then(response => {
        this.setState(
          _ => {
            return {
              peliculas: response.data
            };
          },
          _ => {
            localStorage.setItem(
              "peliculas",
              JSON.stringify(this.state.peliculas)
            );
            localStorage.setItem(
              "selected",
              JSON.stringify(this.state.selected)
            );
          }
        );
      })
      .catch(err => {
        console.log("--> Error Axios Get Movies", err);
      });
  }

  handleDetail(p) {
    this.setState(_ => {
      return { selected: p };
    });
  }

  render() {
    const m = this.props.intl === "es-ES" ? "millón" : "million";
    const ms = this.props.intl === "es-ES" ? "millones" : "millions";

    return (
      <div style={{ margin: "5em 0em" }}>
        <div className="uk-container uk-container-large">
          <div
            style={{ width: "100%" }}
            className="uk-flex uk-flex-center uk-text-center"
          >
            <div>
              <h1>
              <FormattedMessage id="Title" />
              </h1>
              <p className="uk-margin-remove">Sebastian Garcia 201630047</p>
              <hr />
            </div>
          </div>
        </div>

        <div className="uk-container">
          <div className="uk-flex">
            {/* TABLA */}
            <div className="uk-width-1-1@s">
              <table className="uk-table uk-table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>
                      <FormattedMessage id="Name" />
                    </th>
                    <th>
                      <FormattedMessage id="Director" />
                    </th>
                    <th>
                      <FormattedMessage id="Country" />
                    </th>
                    <th>
                      <FormattedMessage id="Budget" />
                    </th>
                    <th>
                      <FormattedMessage id="Release" />
                    </th>
                    <th>
                      <FormattedMessage id="Views" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.peliculas.map((p, i) => {
                    return (
                      <tr key={i}>
                        <td>{p.id}</td>
                        <td>
                          <a href onClick={_ => this.handleDetail(p)}>
                            {p.name}
                          </a>
                        </td>
                        <td>{p.directedBy}</td>
                        <td>{p.country}</td>
                        <td>
                          {p.budget + " "}
                          <FormattedPlural
                            value={p.budget}
                            one={m}
                            other={ms}
                          />
                        </td>
                        <td>
                          <FormattedDate
                            value={new Date(p.releaseDate)}
                            year="numeric"
                            month="long"
                            day="2-digit"
                          />
                        </td>
                        <td>
                          <FormattedNumber value={p.views} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* DETAIL */}
            <div
              className="uk-margin-left uk-width-1-1"
              style={{ padding: "2em" }}
            >
              <Detail pelicula={this.state.selected} />
            </div>
          </div>
        </div>

        {/* D3 */}

        <div>
          {this.state.peliculas.length > 0 ? (
            <Graph data={this.state.peliculas} />
          ) : (
            <React.Fragment>&nbps;</React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default injectIntl(Content);
