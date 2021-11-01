<script lang="ts">
import { IMarkerInformation, IOnboardingStage } from "../interfaces";

import { activeOnboardingStage } from "./stores";



  const handleClick = () => {

  }
  let activeStage: IOnboardingStage | null;
  activeOnboardingStage.subscribe((stage) => {
    activeStage = stage;
  });

  export let markerInformation: IMarkerInformation;
  export let order: number;

  let {x,y, cx, cy, offset} = markerInformation.anchorPosition;


  if(offset?.left) { cx += offset?.left; x += offset?.left; }
  if(offset?.right) { cx -= offset?.right; x -= offset?.right; }
  if(offset?.top) { cy += offset?.top; y += offset?.top; }
  if(offset?.bottom) { cy -= offset?.bottom; y -= offset?.bottom; }
  console.log("markerinformation: ", markerInformation);
  // todo: continue with offset -> check if it works
</script>


<g text-anchor="middle">
  <circle fill={markerInformation.message.onboardingStage.color} class="visahoi-marker" cx={markerInformation.anchorPosition.cx} cy={markerInformation.anchorPosition.cy} r="10" />
  <text fill="white" x={markerInformation.anchorPosition.x} y={markerInformation.anchorPosition.y}>{order}</text>
</g>


<style>
  circle {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
