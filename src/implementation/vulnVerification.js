'use strict'

const printChat = require('../printChat.js')

let vulnArray = []
let result = ''
let mitigatedVulns = ''

module.exports = function vulnVerification (cy) {
  cy.elements().addClass('faded')
  cy.nodes().map((node) => {
    if (node.data().info.concept === 'vulnerability') {
      node.removeClass('faded')
      node.addClass('attention')
      vulnArray.push(node)
    }
    if (node.data().info.concept === 'mechanism') {
      node.removeClass('faded')
      node.addClass('protect')
    }
  })

  vulnArray.map((vuln) => {
    const neighbor = vuln.neighborhood()
    neighbor.map((type) => {
      if (type.data().hasOwnProperty('info')) {
        if (type.data().info.concept === 'mechanism') {
          result = `${result} • Vulnerability ${vuln.data().id} is mitigated by Mechanism ${type.data().id}\n`
          mitigatedVulns += 1
        }
      }
    })
  })
  result = `${result} • Vulnerabilities total: ${vulnArray.length}\n`
  result = `${result} • Mitigated total: ${mitigatedVulns.length}\n`
  printChat(result)
}