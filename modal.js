const overlay = document.getElementById("modal-overlay");

document.getElementById("btn-sync").onclick = () => {
  overlay.style.display = "flex";
};

document.getElementById("btn-skip").onclick = () => {
  overlay.style.display = "none";
};

document.getElementById("btn-join").onclick = async () => {
  const roomId = document.getElementById("modal-id").value.trim();
  const password = document.getElementById("modal-pass").value;
  const status = document.getElementById("modal-status");

  if (!roomId || !password) {
    status.innerHTML = "Please fill <b>both</b> fields.";
    return;
  }

  status.className = "modal-status ";
  status.textContent = "Connecting...";

  try {
    await initSync({ roomId, password, onUpdate: applyRemoteState });
    status.className += "success";
    status.textContent = "Connected";
    setTimeout(() => (overlay.style.display = "none"), 1000);
  } catch (err) {
    status.className += "error";
    status.textContent = "Failure";
    console.error(err);
  }
};
