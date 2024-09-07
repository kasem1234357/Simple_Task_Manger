const useOutsideClick = (Ref,handler,eventType='mousedown')=>{

    window.addEventListener(eventType,event =>{
        const target = event.target 
        if (!target || !target.isConnected) {
                 return
                }
                const isOutside = Array.isArray(Ref)
                ? Ref.every(r => r.current && !r.current.contains(target))
                : Ref.current && !Ref.current.contains(target)
          
              if (isOutside) {
                handler(event)
              }
      
    })
}

export default useOutsideClick