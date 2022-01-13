<script>
  import ClientChat from "./components/ClientChat.svelte";
  import ServerChat from "./components/ServerChat.svelte";
</script>

<h1>Chat app!</h1>
<div id="chatWrapper">
  <div class="chatInnerWrapper">
    <h2>Cliente</h2>
    <ClientChat class="chatWindow" />
  </div>
  <div class="chatInnerWrapper">
    <h2>Servidor</h2>
    <ServerChat class="chatWindow" />
  </div>
</div>

<style>
  h1,
  h2 {
    color: white;
    text-align: center;
  }

  h1 {
    font-size: 48px;
  }

  #chatWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 15px;
  }

  .chatInnerWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  :global(.chatWindow) {
    height: 50%;
    width: 70%;
    background-color: rgb(163, 255, 186);
    box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.2);
    position: relative;
    padding: 0;
  }
</style>
