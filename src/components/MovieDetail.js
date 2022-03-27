import PropTypes from "prop-types";

function MovieDetail(props){
  const torrentLink = props.movie.torrents.map((torrent, index)=>(
    <li key={torrent.url}>
      <a href={torrent.url}>Torrent{index+1}</a><br />
    </li>
  ));
  function onClick(){
    window.location.href=props.movie.url;
  }
  return(
    <div>
        <img src={props.movie.large_cover_image} alt={props.movie.title} />
        <div>
          <h2>{props.movie.title}</h2>
          <p>{props.movie.description_full}</p>
          <button onClick={onClick}>enter page</button>
          <ul>
            {torrentLink}
          </ul>
        </div>
    </div>
    );

}
MovieDetail.propTypes ={
  movie:PropTypes.object.isRequired
};
export default MovieDetail;