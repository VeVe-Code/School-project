import React from 'react'
import { Link } from 'react-router-dom'

function knowledgepagi({links,page}) {
  return (
    <nav aria-label="Page navigation example">
  <ul class="inline-flex -space-x-px text-base h-10">
    <li>
      <Link  to={`${links.previousPage ? '/admin/adminKnowledge?page=' + (page - 1) :'/admin/adminKnowledge?page=' + page }`} class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</Link>
    </li>

    
{ links.looplinks.map((link) => {
  if(link.number == page){
    return(
          
      <Link  key={link.number} to={`/admin/adminKnowledge?page=${link.number}`} aria-current="page" class="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{link.number}</Link>
   
    )
  }else{
    return(
    
      <Link key={link.number} to={`/admin/adminKnowledge?page=${link.number}`} class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{link.number}</Link>
 

    )
  }
})}
 
    <li>
     <Link  to={`${links.nextPage ? '/admin/adminKnowledge?page=' + (page + 1) :'/admin/adminKnowledge?page=' + page }`}class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</Link>
    </li>
  </ul>
</nav>
  )
}

export default knowledgepagi