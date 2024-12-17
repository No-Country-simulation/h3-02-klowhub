/* eslint-disable @typescript-eslint/no-explicit-any */
import { atomWithPersistence } from '@core/services/persistStore';

//Faltaria agregar el tipo de datos que se guardara aqui
export const cartStore = atomWithPersistence<any>('courseCart', {
  courses: [],
});

/*
"use client";

//La ruta del import es de ejemplo xd
import { cartStore } from ".../cart.store";
//iMPORTS de Jotai
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

export default function TuComponente(){
  //Si queres recuperar toda la store
  const [cartStore, setCartStore] = useAtom(cartStore);

  //Si queres recuperar solo el valor, y no editarlo y/o actualizarlo
  const cartStore = useAtomValue(cartStore);

  //Si queres recuperar solo el set para actualizarlo
  const setCartStore = useSetAtom(cartStore);

  return <div>{cartStore.courses.map(course => <div key={course.id}>{course.name}</div>)}</div>;
}

*/
