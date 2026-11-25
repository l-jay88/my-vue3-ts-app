import { useTodoFilter, useDebounceFn } from '../userTodoFilter'

const mockTodos = [
  { id: 1, title: 'Learn Vue', completed: false },
  { id: 2, title: 'Learn TypeScript', completed: true },
  { id: 3, title: 'Buy groceries', completed: false },
  { id: 4, title: 'Finish report', completed: true },
]

describe('useTodoFilter 过滤功能', () => {
  it('无过滤条件且搜索为空时，应返回全部待办事项', () => {
    const { searchList, filterType, searchQuery } = useTodoFilter(mockTodos)

    expect(filterType.value).to.eq('all')
    expect(searchQuery.value).to.eq('')
    expect(searchList.value).to.deep.equal(mockTodos)
  })

  it('按搜索关键词过滤，应返回标题包含关键词的待办事项', () => {
    const { searchList, searchQuery } = useTodoFilter(mockTodos)

    searchQuery.value = 'Learn'

    expect(searchList.value).to.deep.equal([
      { id: 1, title: 'Learn Vue', completed: false },
      { id: 2, title: 'Learn TypeScript', completed: true },
    ])
  })

  it('只过滤已完成的待办事项', () => {
    const { searchList, filterType } = useTodoFilter(mockTodos)

    filterType.value = 'completed'

    expect(searchList.value).to.deep.equal([
      { id: 2, title: 'Learn TypeScript', completed: true },
      { id: 4, title: 'Finish report', completed: true },
    ])
  })

  it('只过滤未完成的待办事项', () => {
    const { searchList, filterType } = useTodoFilter(mockTodos)

    filterType.value = 'uncompleted'

    expect(searchList.value).to.deep.equal([
      { id: 1, title: 'Learn Vue', completed: false },
      { id: 3, title: 'Buy groceries', completed: false },
    ])
  })

  it('搜索关键词与已完成状态组合过滤', () => {
    const { searchList, filterType, searchQuery } = useTodoFilter(mockTodos)

    filterType.value = 'completed'
    searchQuery.value = 'Learn'

    expect(searchList.value).to.deep.equal([{ id: 2, title: 'Learn TypeScript', completed: true }])
  })

  it('搜索关键词与未完成状态组合过滤', () => {
    const { searchList, filterType, searchQuery } = useTodoFilter(mockTodos)

    filterType.value = 'uncompleted'
    searchQuery.value = 'Buy'

    expect(searchList.value).to.deep.equal([{ id: 3, title: 'Buy groceries', completed: false }])
  })

  it('无匹配结果时，应返回空数组', () => {
    const { searchList, searchQuery } = useTodoFilter(mockTodos)

    searchQuery.value = 'NonExistent'

    expect(searchList.value).to.deep.equal([])
  })
})

describe('useDebounceFn 防抖函数', () => {
  it('调用后应延迟执行，等待指定时间后才触发', () => {
    const fn = cy.stub()
    const debounced = useDebounceFn(fn, 300)

    debounced('arg1')
    expect(fn).not.to.have.been.called

    cy.wait(350).then(() => {
      expect(fn).to.have.been.calledOnce
      expect(fn).to.have.been.calledWith('arg1')
    })
  })

  it('延迟期间再次调用应取消前一次，只执行最后一次', () => {
    const fn = cy.stub()
    const debounced = useDebounceFn(fn, 300)

    debounced('first')
    cy.wait(100)
    debounced('second')

    cy.wait(350).then(() => {
      expect(fn).to.have.been.calledOnce
      expect(fn).to.have.been.calledWith('second')
    })
  })

  it('支持自定义延迟时间', () => {
    const fn = cy.stub()
    const debounced = useDebounceFn(fn, 500)

    debounced('test')

    cy.wait(450).then(() => {
      expect(fn).not.to.have.been.called
    })

    cy.wait(100).then(() => {
      expect(fn).to.have.been.calledOnce
    })
  })
})

describe('useTodoFilter 防抖集成', () => {
  it('修改 searchQueryRaw 后应延迟同步到 searchQuery', () => {
    const { searchQuery, searchQueryRaw } = useTodoFilter(mockTodos)

    searchQueryRaw.value = 'Hello'
    expect(searchQuery.value).to.eq('')

    cy.wait(350).then(() => {
      expect(searchQuery.value).to.eq('Hello')
    })
  })

  it('快速连续修改 searchQueryRaw，防抖后只以最后一次为准', () => {
    const { searchQuery, searchQueryRaw } = useTodoFilter(mockTodos)

    searchQueryRaw.value = 'A'
    cy.wait(100)
    searchQueryRaw.value = 'AB'
    cy.wait(100)
    searchQueryRaw.value = 'ABC'

    cy.wait(350).then(() => {
      expect(searchQuery.value).to.eq('ABC')
    })
  })
})
