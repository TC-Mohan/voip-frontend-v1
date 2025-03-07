import { FILE_BASE_RECORDING } from "../../helper/Constants";
import "./Dialpad.css";
import ReactAudioPlayer from "react-audio-player";

const TableComponent2 = ({ data, showDetails = true }) => {
  if (!data || !data.record_url) {
    return null; // Agar record_url available nahi hai toh kuch render mat karo
  }

  // Ensure that data object has a "data" property
  const record = data || {};

  // Ensure that record_url exists before trying to access it
  const recordingFileName = record?.record_url
    ? record.record_url.substring(record.record_url.lastIndexOf("/") + 1)
    : "";

  const formatDate = (dateTimeString) => {
    const [year, month, day, time] = dateTimeString.split("-");
    const date = `${day}/${month}/${year}`;
    const [hours, minutes, seconds] = time.split(":");
    let formattedHours = hours % 12 || 12; 
    const amPm = hours >= 12 ? "PM" : "AM"; 
    const formattedTime = `${formattedHours}:${minutes} ${amPm}`;
    return `${date} ${formattedTime}`;
  };


  // Safely handle the calldate formatting
  const formattedDate = data?.start_time ? formatDate(data.start_time) : "";

  return (
    <div className="container mt-3">
      {showDetails && (
        <table className="table">
          <tbody>
            <tr>
              <td className="text-start mb-3">
                <div className="d-flex justify-content-between">
                  <div>{data?.call_to}</div>
                  <strong>{data?.start_time}</strong>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <ReactAudioPlayer
        className="w-100"
        src={`${FILE_BASE_RECORDING}callforward_rec/${recordingFileName}`}
        controls
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default TableComponent2;

