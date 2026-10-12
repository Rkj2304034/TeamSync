import React, { useEffect, useState } from 'react';
import KanbanColumn from './KanbanColumn';

export default function KanbanBoard({ selectedTaskId, setSelectedTaskId ,tasks }) {

  const statuses = [
    "Todo",
    "In Progress",
    "In Review",
    "Completed"
  ]

  return (
    <main className="flex-1 overflow-x-auto p-8 flex gap-6">

      {

        statuses.map( status => (
          <KanbanColumn  key={status} title={status} 
          tasks={ tasks.filter( task => task.status === status ) }
            selectedTaskId={selectedTaskId} setSelectedTaskId={setSelectedTaskId}
          />
        ) )

      }


    </main>
  );
}