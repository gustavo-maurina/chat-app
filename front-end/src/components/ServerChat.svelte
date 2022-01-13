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
      socket = io("http://localhost:8080", { query: { id: 2 } });
      socket.on("connect", () => {
        hasConnected = true;
      });
      socket.on("receive-message", handleMessageReceived);
    }
  });

  function addMessage(text, timeSent, type) {
    messages.push({ text, timeSent, type });
    messages = messages;
  }

  function handleMessageReceived(params) {
    console.log(params);
    recipientId = params.senderId;
    isChatting = true;
    addMessage(params.text, params.timeSent, "received");
  }

  function submit(e) {
    e.preventDefault();
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
  <div class="messagesWrapper">
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
      type="text"
      placeholder="Digite sua mensagem..."
    />
    <button type="submit">Enviar</button>
  </form>
</div>

<style>
</style>
