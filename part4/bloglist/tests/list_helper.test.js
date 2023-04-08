const listHelper = require("../utils/list_helper")

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
}) 

describe('total likes', () => {
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    const emptyBlogsList= []

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(emptyBlogsList)
        expect(result).toBe(0)
    })

    test('of a bigger list is calculated right', () => {
      const result = listHelper.totalLikes(blogs);
      expect(result).toBe(36)
    })

    test('of a null blog, the number of likes is 0', () => {
      const result = listHelper.totalLikes(null)
      expect(result).toBe(0)
    })

    test('of an undefined blog, the number of likes is 0', () => {
      const result = listHelper.totalLikes(undefined)
      expect(result).toBe(0)
    })
  })

  describe('favorite blog', () => {
    test('when list has only one blog, equals the likes of that', () => {
      const blog = {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      };
      const expected = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      }
      const listWithOneBlog = [blog];
      const result = listHelper.favoriteBlog(listWithOneBlog)
      expect(result).toEqual(expected);
    })

    test('of a bigger list, the favorite blog is calculated right', () => {
      const expectedBlogs = [
        {
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          likes: 12,
        }
      ];

      const result = listHelper.favoriteBlog(blogs);
      expect(expectedBlogs).toContainEqual(result);
    })

    test('of an empty list, the favorite blog is null', () => {
      const result = listHelper.favoriteBlog([]);
      expect(result).toBe(null);
    })

    test('of a null blog, the favorite blog is null', () => {
      const result = listHelper.favoriteBlog(null);
      expect(result).toBe(null);
    })

    test('of an undefined blog, the favorite blog is null', () => {
      const result = listHelper.favoriteBlog(undefined)
      expect(result).toBe(null)
    })
    
    test('list of blog with equal likes, the favorite can be either of those', () => {
      const blog1 = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 10,
        __v: 0
      };
      const blog2 = {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
      };

      const blog3 = {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
      }; 
      const blogs = [blog1, blog2, blog3];
      const expectedBlogs = [
        {
          title: blog1.title,
          author: blog1.author,
          likes: blog1.likes
        }, 
        {
          title: blog2.title, 
          author: blog2.author,
          likes: blog2.likes
        },
      ];
      const result = listHelper.favoriteBlog(blogs);
      expect(expectedBlogs).toContainEqual(result);
    })

  describe('the author with the most blogs', () => {
    test('of a blog with 1 person, there is only 1 author', () => {
      const expected = {
        author: 'Edsger W. Dijkstra',
        blogs: 1,
      }

      const result = listHelper.mostBlogs(listWithOneBlog);
      expect(result).toEqual(expected);
    })

    test('of a normal list, the top bloggers is returned', () => {
      const expected = {
        author: "Robert C. Martin",
        blogs: 3,
      }

      const result = listHelper.mostBlogs(blogs);
      expect(result).toEqual(expected);
    })

    test('of a list with many top bloggers, one of them is returned', () => {
      const listWithManyTopBloggers = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Edsger W. Dijkstra",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }  
      ]

      const expectedBlogs = [
        {
          author: "Robert C. Martin",
          blogs: 3
        },
        {
          author: "Edsger W. Dijkstra",
          blogs: 3
        },
      ]

      const result = listHelper.mostBlogs(listWithManyTopBloggers);
      expect(expectedBlogs).toContainEqual(result);
    })

    test('of an empty list, the top blogger is null', () => {
      const result = listHelper.mostBlogs([]);
      expect(result).toBeNull();
    })
  })
  
  describe('The author with the most likes', () => {
    test('of a blog with 1 person, there is only 1 author', () => {
      const expected = {
        author: 'Edsger W. Dijkstra',
        likes: 5,
      }

      const result = listHelper.mostLikes(listWithOneBlog);
      expect(result).toEqual(expected);
    })

    test('of a normal list, the blogger with the most likes is returned', () => {
      const expected = {
        author: "Edsger W. Dijkstra",
        likes: 17
      }

      const result = listHelper.mostLikes(blogs);
      expect(result).toEqual(expected);
    })

    test('of a list with many top bloggers, one of them is returned', () => {
      const listWithManyTopBloggers = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Edsger W. Dijkstra",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }  
      ]

      const expectedBlogs = [
        {
          author: "Robert C. Martin",
          likes: 24,
        },
        {
          author: "Edsger W. Dijkstra",
          likes: 24,
        },
      ]

      const result = listHelper.mostLikes(listWithManyTopBloggers);
      expect(expectedBlogs).toContainEqual(result);
    })

    test('of an empty list, the top blogger is null', () => {
      const result = listHelper.mostLikes([]);
      expect(result).toBeNull();
    })
  })
})