import { AUTHORIZATION, URL } from "./constants"
import axios from 'axios'
import { writeFileSync } from 'fs'
import { ReqItem, ReqItemMap, reqItemsMap } from "./input"

async function processOne(reqItem: ReqItem) {
  // logic goes here
  const url = URL
  const data = {}
  // console.log(url)
  console.log(`processing id: ${reqItem.someId}`)
  try {
    await axios.request({
      method: 'GET',
      url,
      headers: {
        'Authorization': `${AUTHORIZATION}`,
        'Content-Type': 'application/json',
      },
      data,
    })
    reqItem.success = true
  } catch(err) {
    if(err instanceof Error) {
      reqItem.errMsg = err.message
      reqItem.err = err
    } else {
      reqItem.errMsg = 'axios request failed with unknown error'
    }
    reqItem.success = false
  }
}

async function processAll(reqItemsMap: ReqItemMap) {
  const reqPromiseArr = []
  let reqIndex = -1
  for (const reqItem of Object.values(reqItemsMap)) {
    reqPromiseArr[++reqIndex] = processOne(reqItem)
  }
  await Promise.all(reqPromiseArr)
}

function getFailed(reqItemsMap: ReqItemMap) {
  const reqItems = Object.values(reqItemsMap)
  const failed = reqItems.filter(reqItem => !reqItem.success)
  return failed
}

function printResult(reqItemsMap: ReqItemMap) {
  const reqItems = Object.values(reqItemsMap)
  const failed = getFailed(reqItemsMap)
  const failCount = failed.length
  const successCount = reqItems.length - failCount
  console.log(`Success count: ${successCount}`)
  console.log(`Fail count: ${failCount}`)

  console.log(`FAILS:`)
  for (const reqItem of failed) {
    console.log(`${reqItem.someId}\t\t${reqItem.errMsg}`)
  }
}

function saveToFile() {
  const now = new Date()
  const filePath = `${__dirname}/output/log_${now.getTime()}.json`
  writeFileSync(filePath, JSON.stringify(Object.values(reqItemsMap), undefined, 2))
  console.log(`For complete result please check:\n${filePath}`)
}

async function main() {
  console.log(`::::::::::::::: processing... ::::::::::::::`)
  await processAll(reqItemsMap)
  console.log(`::::::::::::::: processing...finished ::::::::::::::`)
  printResult(reqItemsMap)
  saveToFile()
  console.log(`::::::::::::::: finished ::::::::::::::`)
}
main()