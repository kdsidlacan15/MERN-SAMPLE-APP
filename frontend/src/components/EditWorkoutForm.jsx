import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
const EditWorkoutForm = ({ workout, setVisible }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [updatedWorkout, setUpdatedWorkout] = useState({
    title: "",
    load: "",
    reps: "",
  });

  // Function to check if all values in the object are not empty
  const isEmptyValues = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === "") {
        return false;
      }
    }
    return true;
  };

  const handleEditWorkoutForm = (e, key) => {
    if (key === "title") {
      setUpdatedWorkout({
        ...updatedWorkout,
        title: e.target.value,
      });
    } else if (key === "load") {
      setUpdatedWorkout({
        ...updatedWorkout,
        load: e.target.value,
      });
    } else {
      setUpdatedWorkout({
        ...updatedWorkout,
        reps: e.target.value,
      });
    }
  };

  const handleSaveWorkout = async () => {
    if (!user) {
      return;
    }
    setLoading(true);
    const response = await fetch(
      `http://localhost:4000/api/workouts/${workout._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(updatedWorkout),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      setLoading(false);
      setError(data.error);
    } else {
      dispatch({ type: "UPDATE_WORKOUT", payload: data });
      setLoading(false);
      setUpdatedWorkout({
        title: "",
        load: "",
        reps: "",
      });
      setError(false);
      setVisible(false);
      console.log("New workout added", data);
    }
  };

  const handleCancelEditWorkout = () => {
    setVisible(false);
    setUpdatedWorkout({});
  };

  return (
    <form>
      <div className="edit-card">
        <h3>Edit Workout</h3>

        <label>Exercise Type:</label>
        <input
          type="text"
          onChange={(e) => handleEditWorkoutForm(e, "title")}
          value={updatedWorkout.title}
        />

        <label>Load(kg): </label>
        <input
          type="number"
          onChange={(e) => handleEditWorkoutForm(e, "load")}
          value={updatedWorkout.load}
        />

        <label>Reps:</label>
        <input
          type="number"
          onChange={(e) => handleEditWorkoutForm(e, "reps")}
          value={updatedWorkout.reps}
        />

        {loading ? (
          <div className="loading">{loading}</div>
        ) : (
          <div className="form-button-group">
            <button
              id={
                !isEmptyValues(updatedWorkout)
                  ? "disabled-button"
                  : "save-button"
              }
              onClick={handleSaveWorkout}
              disabled={!isEmptyValues(updatedWorkout)}
            >
              Save
            </button>
            <button id="cancel-button" onClick={handleCancelEditWorkout}>
              Cancel
            </button>
          </div>
        )}
        {error && <div className="error">{error}</div>}
      </div>
    </form>
  );
};

export default EditWorkoutForm;
