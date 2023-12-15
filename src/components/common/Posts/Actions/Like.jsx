import React from 'react'
import { PiHandsClappingDuotone } from 'react-icons/pi'
export default function Like() {
  return (
    <button type='button' title='Comment' className="flex items-center gap-1 text-sm">
        <PiHandsClappingDuotone className="text-2xl" />
        <span>1</span>
    </button>
  )
}
