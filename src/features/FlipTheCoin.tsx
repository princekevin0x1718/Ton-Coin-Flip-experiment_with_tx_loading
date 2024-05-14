"use client"

import { useCallback } from "react"

import { Cell, loadTransaction } from "@ton/core"
import { useTonConnectUI } from "@tonconnect/ui-react"
import "buffer"

import useBetAmount from "@/features/BetAmount/useBetAmount"
import useHeadOrTail from "@/features/HeadOrTail/useHeadOrTail"
import { createBetTransaction } from "@/services/ton/transactions"

function FlipTheCoin() {
  const [tonConnectUI] = useTonConnectUI()

  const { betAmount } = useBetAmount()
  const { headOrTail } = useHeadOrTail()
  console.log({ betAmount, headOrTail })

  const onButtonClick = useCallback(async () => {
    const myTransaction = createBetTransaction()
    const data = await tonConnectUI.sendTransaction(myTransaction)

    try {
      console.log("data", data)
      const cell = Cell.fromBoc(Buffer.from(data.boc, "base64"))[0]
      console.log("cell", cell)
      const transaction = loadTransaction(cell.beginParse())
      console.log("transaction", transaction)
    } catch (error) {
      console.error(error)
    }
  }, [tonConnectUI])

  return <button onClick={onButtonClick}>flip</button>
}

export default FlipTheCoin
