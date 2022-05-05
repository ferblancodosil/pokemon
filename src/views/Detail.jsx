import {useParams} from "react-router";

function Detail() {
  let { name } = useParams();

  return (
    <div className="container">
      <div className="row">
        <div className="twelve column mt-1">
          DEtalles de {name}
        </div>
      </div>
    </div>
  );
}

export default Detail;
