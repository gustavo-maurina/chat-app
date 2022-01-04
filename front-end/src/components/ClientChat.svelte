<script>
  function submit(e) {
    e.preventDefault()
    console.log('submit');
  }
</script>


<div class={$$props.class}>
  <div>
    <form on:submit={submit}>
      <input type="text" placeholder="Digite sua mensagem..." />
      <button type="submit">Enviar</button>
    </form>
    
  </div>
</div>

<style>
  input {
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
    padding:0;
    margin: 0;
    width: 80px;
    border: none;
    background-color: rgb(31, 144, 69);
    color: white;
  }
</style>


  
