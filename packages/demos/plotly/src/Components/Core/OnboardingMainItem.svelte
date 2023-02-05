<script lang="ts">

export let showOnboardingSteps = false;

    const handleClick = () =>{

    }

</script>

<div class="visahoi-navigation-main-item" on:click={handleClick}>
    <div
      class="visahoi-navigation-item-circle">
      {#if showOnboardingSteps}
      <span style="display: flex">Close</span>
        {:else}
        <span style="display: flex">Help</span>
        {/if}
      </div>
</div>

<style>
    .visahoi-navigation-main-item {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.5s ease, bottom 0.5s ease;
    margin: 5px;
    width: 80px;
    top: 50;
    opacity: 1;
    z-index: 15;

  }

  .visahoi-navigation-item-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    margin: 5px;
    background-color: rgb(129, 5, 113);
  }
</style>