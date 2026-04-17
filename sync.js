let _roomId = null;
let _onUpdate = null;
let _stompClient = null;

async function initSync({ roomId, password, onUpdate }) {
  _roomId = roomId;
  _onUpdate = onUpdate;

  // Fetch current room state
  const res = await fetch(
    `${BACKEND_URL}/api/room/${encodeURIComponent(roomId)}`,
  );
  const { data } = await res.json();
  if (data) _onUpdate(JSON.parse(data));

  // Open WebSocket for updates
  const socket = new SockJS(`${BACKEND_URL}/ws`);
  _stompClient = Stomp.over(socket);
  _stompClient.debug = null;

  // Subscribe
  _stompClient.connect({}, () => {
    _stompClient.subscribe(`/topic/room/${roomId}`, (msg) => {
      const { data } = JSON.parse(msg.body);
      _onUpdate(JSON.parse(data));
    });
  });
}

let pushTimeout; // for debouncing
async function pushState(stateArray) {
  if (!_roomId) return;

  clearTimeout(pushTimeout);

  pushTimeout = setTimeout(async () => {
    await fetch(`${BACKEND_URL}/api/room/${encodeURIComponent(_roomId)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: JSON.stringify(stateArray) }),
    });
  }, 500); // push state after 500ms of inactivity
}
