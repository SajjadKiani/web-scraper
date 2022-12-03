const data = [
    {name: 'sajad', age: 20},
    {name: 'hamed', age: 14},
    {name: 'zeinab', age: 10},
]

console.log(
    data.filter((d) => d.age === 20)[0]
);