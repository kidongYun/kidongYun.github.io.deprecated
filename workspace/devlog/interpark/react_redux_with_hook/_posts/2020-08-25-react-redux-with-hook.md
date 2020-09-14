---
layout: post
title:  "Interpark - How to use the Redux with Hook technique."
date:   2020-08-25 15:00:00 +0900
categories: interpark react redux hook typescript
---

```typescript

import CellType from '../model/CellType'

const DELETE_CELL = 'cell/DELETE' as const
const OPEN_CELL = 'cell/OPEN' as const
const UPDATE_CELL = 'cell/UPDATE' as const

export const deleteCell = (cell: CellType) => ({ type: DELETE_CELL, payload: cell })
export const openCell = (cell: CellType) => ({ type: OPEN_CELL, payload: cell })
export const updateCell = (cell: CellType) => ({ type: UPDATE_CELL, payload: cell })

type ApiAction =
    | ReturnType<typeof deleteCell>
    | ReturnType<typeof openCell>
    | ReturnType<typeof updateCell>

type ApiState = {
    deletedCell: CellType
    openedCell: CellType
    updatedCell: CellType
}

const initialState = {
    deletedCell: { id: -1, type: "CELL" },
    openedCell: { id: -1, type: "CELL" },
    updatedCell: { id: -1, type: "CELL"}
}

function api(state: ApiState = initialState, action: ApiAction) {
    switch (action.type) {
        case DELETE_CELL :
            return { deletedCell: action.payload, openedCell: state.openedCell, updatedCell: state.updatedCell }
        case OPEN_CELL :
            return { deletedCell: state.deletedCell, openedCell: action.payload, updatedCell: state.updatedCell }
        case UPDATE_CELL :
            return { deletedCell: state.deletedCell, openedCell: state.openedCell, updatedCell: action.payload }
        default :
            return state
    }
}

export default api;

```

```typescript

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { useCallback } from 'react'

import { deleteCell, openCell, updateCell } from '../modules/cell'
import CellType from '../model/CellType';

export default function useApi() {
    const deletedCell = useSelector((state: RootState) => state.cell.deletedCell );
    const openedCell = useSelector((state: RootState) => state.cell.openedCell );
    const updatedCell = useSelector((state: RootState) => state.cell.updatedCell );

    const dispatch = useDispatch();
    const onDeleteCell = useCallback((cell: CellType) => dispatch(deleteCell(cell)), [dispatch]);
    const onOpenCell = useCallback((cell: CellType) => dispatch(openCell(cell)), [dispatch]);
    const onUpdateCell = useCallback((cell: CellType) => dispatch(updateCell(cell)), [dispatch]);

    return {
        deletedCell,
        openedCell,
        updatedCell,
        onDeleteCell,
        onOpenCell,
        onUpdateCell
    }
}

```

```typescript

import { combineReducers } from 'redux';
import stage from './stage'
import noti from './noti'
import modal from './modal'
import data from './data'
import cell from './cell'

const rootReducer = combineReducers({
    stage,
    noti,
    modal,
    data,
    cell
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

```

```json

  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.3.2",
    "@testing-library/user-event": "^7.1.2",
    "@types/jest": "^24.0.0",
    "@types/node": "^12.0.0",
    "@types/react": "^16.9.0",
    "@types/react-bootstrap": "^1.0.1",
    "@types/react-dom": "^16.9.0",
    "@types/react-redux": "^7.1.9",
    "@types/styled-components": "^5.1.0",
    "axios": "^0.19.2",
    "bootstrap": "^4.4.1",
    "class-transformer": "^0.2.3",
    "react": "^16.13.1",
    "react-bootstrap": "^1.0.0",
    "react-dom": "^16.13.1",
    "react-redux": "^7.2.0",
    "react-scripts": "3.4.1",
    "redux": "^4.0.5",
    "styled-components": "^5.1.0",
    "typescript": "~3.7.2"
  }
  
```