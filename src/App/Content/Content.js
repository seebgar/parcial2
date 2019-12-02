import React from "react";
import axios from "axios";
import { FormattedDate, FormattedNumber, FormattedPlural } from "react-intl";
import Detail from "./Detail";

const url_peliculas =
  "https://gist.githubusercontent.com/josejbocanegra/f784b189117d214578ac2358eb0a01d7/raw/2b22960c3f203bdf4fac44cc7e3849689218b8c0/data-es.json";

export default class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
          peliculas: JSON.parse(localStorage.getItem("peliculas")) || []
        };
      });
    }
    this.get_peliculas();
  }

  get_peliculas() {
    axios
      .get(url_peliculas)
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
          }
        );
      })
      .catch(err => {
        console.log("--> Error Axios Get Exchange Rate", err);
      });
  }

  handleDetail(p) {
    console.log("llego", p);
    this.setState(_ => {
      return { selected: p };
    });
  }

  render() {
    return (
      <div style={{ margin: "5em 0em" }}>
        <div className="uk-container">
          <div className="uk-flex">
            {/* TABLA */}

            <div className="uk-width-1-1@s">
              <table className="uk-table uk-table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Director</th>
                    <th>Country</th>
                    <th>Budget</th>
                    <th>Release</th>
                    <th>Views</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.peliculas.map((p, i) => {
                    return (
                      <tr key={i}>
                        <td>{p.id}</td>
                        <td>
                          <a onClick={_ => this.handleDetail(p)}>{p.name}</a>
                        </td>
                        <td>{p.directedBy}</td>
                        <td>{p.country}</td>
                        <td>{p.budget}</td>
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
      </div>
    );
  }
}
