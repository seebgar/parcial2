import React from "react";
import './Detail.css'
import { FormattedMessage } from "react-intl";


export default function Detail(props) {
  return (
    <React.Fragment>
      {props.pelicula ? (
        <div class="uk-card uk-card-default">
          <div id="Poster" class="uk-card-media-top" style={{ backgroundImage: `url(${props.pelicula.poster})` }}>
            &nbsp;
          </div>
          <div class="uk-card-body">
            <h3 class="uk-card-title">
              {props.pelicula.name}
            </h3>
            <p>{props.pelicula.description}</p>
          </div>
          <div class="uk-card-footer">
            <p>
              <strong>Cast</strong>
            </p>
            <p>{props.pelicula.cast}</p>
          </div>
        </div>
      ) : (
        <div>
          <p>
            <FormattedMessage id="Mss" />
          </p>
        </div>
      )}
    </React.Fragment>
  );
}
