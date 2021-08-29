export interface Praise {
  from: string
  to: string
  createdAt: string
  tags: string[]
  message: string
}

const message =
  'ここにはめちゃくちゃ長文が入ります。 #tag ここにはめちゃくちゃ長文が入ります。 #tag ここにはめちゃくちゃ長文が入ります。 #tag ここにはめちゃくちゃ長文が入ります。 #tag ここにはめちゃくちゃ長文が入ります。 #tag ここにはめちゃくちゃ長文が入ります。 #tag ここにはめちゃくちゃ長文が入ります。 #tag ここにはめちゃくちゃ長文が入ります。 #tag ここにはめちゃくちゃ長文が入ります。 #tag ここにはめちゃくちゃ長文が入ります。 #tag ここにはめちゃくちゃ長文が入ります。 #tag ありがとう！ #感謝 #圧倒的感謝'

const list = [
  { from: 'User1', to: 'Me', createdAt: '2021/08/28', tags: ['AAA', 'BBB'], message },
  { from: 'User1', to: 'Me', createdAt: '2021/08/28', tags: ['AAA', 'BBB'], message },
  { from: 'User1', to: 'Me', createdAt: '2021/08/28', tags: ['AAA', 'BBB'], message },
  { from: 'User1', to: 'Me', createdAt: '2021/08/28', tags: ['AAA', 'BBB'], message },
  { from: 'User1', to: 'Me', createdAt: '2021/08/28', tags: ['AAA', 'BBB'], message },
]

export const fetchPraise = () =>
  new Promise<Praise[]>((resolve) =>
    setTimeout(() => {
      resolve(list)
    }, 1000)
  )

export const postPraise = (to: string, message: string, tags: string[]) =>
  new Promise<Praise>((resolve) =>
    setTimeout(() => {
      resolve({
        from: 'Me',
        to,
        createdAt: '2021/08/31',
        tags,
        message,
      })
    }, 1000)
  )
