import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";
import axios from "axios";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, skills, photoUrl } = user ? user : [];

  const dispatch = useDispatch();

  const handleUserFeed = async (status, id) => {
    const res = await axios.post(
      BASE_URL + "/request/send/" + status + "/" + id,
      {},
      { withCredentials: true },
    );
    dispatch(removeFeed(id));
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="Users" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{skills}</p>
        <div className="card-actions justify-center my-2">
          <button
            className="btn btn-secondary"
            onClick={() => handleUserFeed("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleUserFeed("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
