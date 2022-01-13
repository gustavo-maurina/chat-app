<script>
  import { io } from "socket.io-client";
  import { onMount } from "svelte";
  import { sendMessage } from "../helpers/sendMessage";
  import "../styles/chat.styles.css";

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

  function addMessage(text, timeSent, type) {
    messages.push({ text, timeSent, type });
    messages = messages;
    document.getElementById("clientMessages").scrollTop = 999;
  }

  function handleMessageReceived(params) {
    console.log(params);
    addMessage(params.text, params.timeSent, "received");
  }

  function submit(e) {
    e.preventDefault();
    if (!currentMessage.replaceAll(" ", "")) return;

    const message = sendMessage(socket, {
      recipient: recipientId,
      text: currentMessage,
    });

    addMessage(currentMessage, message.timeSent, "sent");
    currentMessage = "";
  }
</script>

{#if hasConnected}
  <p style="color: white;">Seu id: {socket.id}</p>
{/if}

<div class={$$props.class}>
  <div class="messagesWrapper" id="clientMessages">
    <ul>
      {#each messages as msg}
        <li class={msg.type}>
          <div class="message">{msg.text}</div>
          <div class="time">{msg.timeSent}</div>
        </li>
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
  <div id="connectWrapper">
    <div style="color:white">Id do recipiente:</div>
    <input id="connectToInput" bind:value={recipientId} type="text" />
  </div>
{/if}

<style>
  #connectWrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
    width: 70%;
  }
  #connectToInput {
    height: 35px;
    width: 100%;
    position: unset;
    margin: 0;
  }
</style>
