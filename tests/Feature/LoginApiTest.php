<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LoginApiTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        // テストユーザー作成
        $this->user = factory(User::class)->create([
            'password'  => bcrypt('password')
        ]);
    }

    /**
     * @test
     */
    public function should_登録済みのユーザーを認証して返却する()
    {
        // 作成したテストユーザのemailとpasswordで認証リクエスト
        $response = $this->json('POST', route('login'), [
            'email' => $this->user->email,
            'password' => 'password',
        ]);
        // dd($response->getContent());

        // 正しいレスポンスが返り、ユーザ名が取得できることを確認
        // TODO: 422 になってしまう。なんで？
        $response
            ->assertStatus(200)
            ->assertJson(['name' => $this->user->name]);

        // 指定したユーザーが認証されていることを確認
        $this->assertAuthenticatedAs($this->user);
    }
}