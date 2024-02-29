import React from "react";

const Notification = ({ notification }) => {
  return (
    <>
      <div className="position-relative">
        <div className="notification shadow-lg">
          {notification.map((msg, index) => (
            <div
              key={index}
              className="row justify-content-center p-3 fw-semibold"
            >
              <div className="col-3">
                <img
                  src={`http://meskot.pythonanywhere.com${msg.upload_img}`}
                  className="img-fluid"
                  alt="image"
                  width={"80px"}
                />
              </div>
              <div className="col-3">
                <p className="text-uppercase">{msg.object_type}</p>
              </div>
              <div className="col-3">
                <p>{msg.object_name}</p>
              </div>
              <div className="col-3">
                <p>{msg.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notification;
