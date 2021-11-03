<script lang="ts">
  import { IMarkerInformation } from "../interfaces";
  import { activeMarker } from "./stores";
  import { v4 as uuidv4 } from 'uuid';

  export let markerInformation: IMarkerInformation;
  export let order: number;

  const markerId = uuidv4().split("-").join("");

  const handleClick = () => {
    if($activeMarker?.markerId === markerId) {
      activeMarker.set(null);
    } else {
      activeMarker.set({
        markerId,
        markerInformation
      });
    }
  }

  let {x,y, cx, cy, offset} = markerInformation.anchorPosition;
  if(offset?.left) { cx += offset?.left; x += offset?.left; }
  if(offset?.right) { cx -= offset?.right; x -= offset?.right; }
  if(offset?.top) { cy += offset?.top; y += offset?.top; }
  if(offset?.bottom) { cy -= offset?.bottom; y -= offset?.bottom; }
</script>

<g id={markerId} text-anchor="middle" on:click={handleClick}>
  <circle fill={markerInformation.message.onboardingStage.color} class="visahoi-marker" cx={markerInformation.anchorPosition.cx} cy={markerInformation.anchorPosition.cy} r="10" />
  <text fill="white" x={markerInformation.anchorPosition.x} y={markerInformation.anchorPosition.y}>{order}</text>
</g>

<style>
  circle {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  g {
    cursor: pointer;
  }
</style>
