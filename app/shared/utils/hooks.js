import {  useRef, useEffect } from 'react'

export const getPreviousProps =  value => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  