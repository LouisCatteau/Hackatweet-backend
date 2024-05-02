it('POST /users', async () => {
    const res = await request(app).post('/users/signup').send({
      firstname: 'Alex',
      username : "Yoliyolu",
      password : "youpi"
    });
   
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(true);
    expect(res.body.firstname).toBe('Alex');
    expect(res.body.username).toBe('Yoliyolu');
    expect(res.body.token).toEqual(expect.any(String))
    expect(res.body.token.length).toBe(32)
   });