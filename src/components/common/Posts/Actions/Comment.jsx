import React from 'react'
import { FaRegComment } from 'react-icons/fa';
import { Blog } from '../../../../context/Context';
import { formatNumber } from '../../../../utils/helpers';


export default function Comment() {
  const { setShowCommentModal, commentLength, } = Blog();

  return (
    <button onClick={() => setShowCommentModal(true)} type='button' title='Comment' className="flex items-center gap-1 text-sm">
        <FaRegComment  className="text-[1.2rem]" />
        <span>{formatNumber(commentLength)}</span>
    </button>
  )
}
