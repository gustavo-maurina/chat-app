<script>
  import { io } from "socket.io-client";
  import { onMount } from "svelte";

  let isChatting = false;
  let recipientId = undefined;
  let currentMessage = "";
  let socket = null;
  let hasConnected = false;
  $: messages = [];

  onMount(async () => {
    if (!socket) {
      socket = io("http://localhost:8080", { query: { id: 1 } });
      socket.on("connect", () => (hasConnected = true));
      socket.on("receive-message", handleMessageReceived);
    }
  });

  function addMessage(text, type) {
    messages.push({ text, type });
    messages = messages;
  }

  function handleMessageReceived(params) {
    console.log(params);
    addMessage(params.text, "received");
  }

  function submit(e) {
    e.preventDefault();
    socket.emit("send-message", {
      recipient: recipientId,
      text: currentMessage,
    });
    addMessage(currentMessage, "sent");
    currentMessage = "";
  }
</script>

{#if hasConnected}
  <p style="color: white;">Seu id: {socket.id}</p>
{/if}
<div class={$$props.class}>
  <div class="messagesWrapper">
    <ul>
      {#each messages as msg}
        <li class={msg.type}>{msg.text}</li>
      {/each}
    </ul>
  </div>
  <form on:submit={submit}>
    <input
      bind:value={currentMessage}
      id="msgInput"
      type="text"
      placeholder="Digite sua mensagem..."
    />
    <button type="submit">Enviar</button>
  </form>
</div>

{#if !isChatting}
  <div style="color:white">Connect to:</div>
  <input bind:value={recipientId} type="text" />
{/if}

<style>
  #msgInput {
    width: 100%;
    height: 50px;
    position: absolute;
    padding-left: 15px;
    bottom: 0;
    margin: 0;
    color: black;
  }

  button {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 50px;
    padding: 0;
    margin: 0;
    width: 80px;
    border: none;
    background-color: rgb(31, 144, 69);
    color: white;
  }

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0;
    list-style: none;
  }

  li {
    margin: 0 10px;
    padding: 5px 10px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.774);
    width: fit-content;
  }

  .sent {
    align-self: end;
  }

  .messagesWrapper {
    max-height: 100%;
    overflow: hidden;
  }
</style>
