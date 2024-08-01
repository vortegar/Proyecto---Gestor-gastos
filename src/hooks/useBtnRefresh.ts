import { useState } from "react"

export const useBtnRefresh = () => {
    const [isBlockBtn, setIsBlockBtn] = useState(false)
    const [isBlockBtnDelete, setIsBlockBtnDelete] = useState(false)

    const [refresh, setRefresh] = useState(false)

    const toggleBlockBtn =  () => { setIsBlockBtn( v => !v )}
    const toggleBlockBtnDelete =  () => { setIsBlockBtnDelete( v => !v )}
    const toggleRefresh =  () => { setRefresh( v => !v )}


  return {
    // Estados
    isBlockBtn,
    isBlockBtnDelete,
    refresh,
    // Metodos
    toggleBlockBtn,
    toggleBlockBtnDelete,
    toggleRefresh
  }
}
