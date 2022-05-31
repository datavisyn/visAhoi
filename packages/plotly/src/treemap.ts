import {
    EVisualizationType,
    IOnboardingMessage,
    IOnboardingTreemapSpec,
    generateMessages,
  } from "@visahoi/core";
  
  function extractOnboardingSpec(chart: any, coords): IOnboardingTreemapSpec {    
  
  let indexArr: number[] = [];
  let valArr: number[] = [];
  let childArr: any =[];
  let maxIndex: number;
  let minIndex: number;
  let maxLabel: string= '';
  let minLabel: string= '';

  console.log(chart.data)

  chart.data.map((dat: any, i: number) => {
    dat.parents.map((parent: any, j: number) => {      
      if(parent === "Workforce Development") {
        indexArr.push(j);  
       }      
    });
   
    dat.values.map((value: number, id: number) => {
      if(indexArr) {
        indexArr.map((d) => {
          if(d === id) {          
            childArr.push({value: value,
            index: id});
            valArr.push(value);           
          }
        })        
      }      
    });      
  });  
  
  const maxVal = Math.max.apply(Math, valArr);
  const minVal = Math.min.apply(Math, valArr);  
  

  childArr.map((dd:any, i: number) => {    
    if(parseInt(dd.value) === maxVal) {      
      maxIndex = dd.index;
    }
    if(parseInt(dd.value) === minVal) {      
      minIndex = dd.index;      
    }
  })
  
  chart.data.map((d: any) => d.labels.map((label: string, i:number ) => {
    if(i === maxIndex) {
      maxLabel = label;
    }
    if(i === minIndex) {
      minLabel = label;
    }
  }));   
  
    return {
      chartTitle: {        
        value: chart.layout.title.text,
        anchor: {
          findDomNodeByValue: true,
          offset: {left: -20, top: 10}
        }
      },

      desc: {        
        value: chart.data[0].labels[0],
        anchor: {
          findDomNodeByValue: true,
          offset: {left: -20, top: 20}
        }
      },

      subDesc: {
        value: chart.data[0].labels[17],
        anchor: {
          findDomNodeByValue: true,
          offset: {left: -40, top:-60}
        }
      },
      otherDesc: {
        value: chart.data[0].labels[6],
        anchor: {
          findDomNodeByValue: true,
          offset: {left: -80, top: -30}
        }
      },
      interactingDesc:{
        value: chart.data[0].labels[8],
        anchor: {
          findDomNodeByValue: true,
          offset: {left: -20, top: -30}
        }
      },
      maxValueDesc: {        
        value: maxLabel,
        anchor: {
          findDomNodeByValue: true,
          offset: {left: -20, top: -30}
        }
      },
      minValueDesc: {        
        value: minLabel,
        anchor: {
          findDomNodeByValue: true,
          offset: {left: -20, top: -20}
        }
      },
      maxValue: {
        value: maxVal,        
      },
      minValue: {
        value: minVal
      }  
     
    };
  }
  
  export function treemapFactory(chart: Element, coords, visElementId: Element): IOnboardingMessage[] {
    const onbordingSpec = extractOnboardingSpec(chart, coords);
    return generateMessages(EVisualizationType.TREEMAP, onbordingSpec, visElementId);
  }
  