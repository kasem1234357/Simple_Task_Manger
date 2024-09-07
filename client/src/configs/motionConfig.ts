export const config_animateX ={initial:{  opacity:0,x:"100vw"},
animate:{x:0 , opacity:1},
transition:{
  type:'spring',
  ease:"linear",
  stiffness: 100 ,
  duration: 0.275
}
}
export const config_animateY ={initial:{  opacity:0,y:"-100vh"},
animate:{y:0 , opacity:1},
transition:{
  type:'spring',
  ease:"linear",
  stiffness: 100 ,
  duration: 0.2
}
}
export const config_animate_model ={initial:{  opacity:0,y:"-100vh",x:"-50%"},
animate:{y:"-50%",x:"-50%" , opacity:1},
transition:{
  type:'spring',
  ease:"linear",
  stiffness: 100 ,
  duration: 0.2
}
}
export const config_scale ={initial:{  scale:0},
animate:{scale:1 },
transition:{
  type:'spring',
  ease:"linear",
  stiffness: 70 ,
  duration: 0.4
}
}