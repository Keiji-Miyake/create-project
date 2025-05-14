#!/usr/bin/env node

import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import { z } from 'zod';

// プロジェクト設定の型定義
const ProjectConfigSchema = z.object({
  projectName: z.string().min(1, 'プロジェクト名を入力してください'),
  stack: z.enum(['web', 'mobile']),
  agent: z.enum(['copilot', 'cline', 'cursor'])
});

type ProjectConfig = z.infer<typeof ProjectConfigSchema>;

// 現在はデフォルトでwebとcopilotのみ対応
// 後のバージョンで他の選択肢も実装予定

/**
 * コマンドライン引数からプロジェクト名を取得
 */
function getProjectNameFromArgs(): string | null {
  const args = process.argv.slice(2);
  return args.length > 0 ? args[0] : null;
}

/**
 * プロジェクト名のみ取得し、他のパラメータはデフォルト値に設定
 */
async function promptForProjectConfig(initialProjectName: string | null): Promise<ProjectConfig> {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'プロジェクト名:',
        default: initialProjectName,
        validate: (input: string) => input.trim() !== '' ? true : 'プロジェクト名を入力してください'
      }
    ]);

    // 現時点では、webとcopilotのみ対応
    const config = {
      projectName: answers.projectName,
      stack: 'web' as const,
      agent: 'copilot' as const
    };

    // Zodバリデーション
    return ProjectConfigSchema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('入力に問題があります:', error.errors);
    } else {
      console.error('エラーが発生しました:', error);
    }
    process.exit(1);
  }
}

/**
 * テンプレートをプロジェクトディレクトリにコピー
 */
async function copyTemplate(config: ProjectConfig): Promise<void> {
  // 開発環境とproduction環境でパスを正しく解決
  let templateDir = path.resolve(__dirname, '../templates');
  // ビルド済み環境(node dist/bin/index.js)で実行される場合
  if (!fs.existsSync(templateDir)) {
    templateDir = path.resolve(__dirname, '../../templates');
  }
  
  const templatePath = path.resolve(templateDir, `${config.stack}-${config.agent}`);
  const targetPath = path.resolve(process.cwd(), config.projectName);

  // --- ここから instructions/prompts のテンプレート反映処理 ---
  // プロジェクトルートの .github/instructions, .github/prompts をテンプレート側に反映
  const projectRoot = path.resolve(__dirname, '..');
  const rootGh = path.join(projectRoot, '.github');
  const rootInstructions = path.join(rootGh, 'instructions');
  const rootPrompts = path.join(rootGh, 'prompts');
  const tmplGh = path.join(templatePath, '.github');
  const tmplInstructions = path.join(tmplGh, 'instructions');
  const tmplPrompts = path.join(tmplGh, 'prompts');

  // instructions
  if (await fs.pathExists(rootInstructions)) {
    await fs.ensureDir(tmplGh);
    await fs.copy(rootInstructions, tmplInstructions, { overwrite: true });
    console.log('✅ テンプレートに instructions を反映しました');
  }
  // prompts
  if (await fs.pathExists(rootPrompts)) {
    await fs.ensureDir(tmplGh);
    await fs.copy(rootPrompts, tmplPrompts, { overwrite: true });
    console.log('✅ テンプレートに prompts を反映しました');
  }
  // --- ここまで追加 ---

  try {
    // ディレクトリが存在するか確認
    if (await fs.pathExists(targetPath)) {
      const { overwrite } = await inquirer.prompt([{
        type: 'confirm',
        name: 'overwrite',
        message: `ディレクトリ '${config.projectName}' は既に存在します。上書きしますか？`,
        default: false
      }]);

      if (!overwrite) {
        console.log('プロジェクト作成をキャンセルしました。');
        process.exit(0);
      }
    }

    // テンプレートディレクトリをコピー
    await fs.copy(templatePath, targetPath);

    // --- ここから .github/instructions, .github/prompts の明示的コピー処理 ---
    const ghSrc = path.join(templatePath, '.github');
    const ghDest = path.join(targetPath, '.github');
    const instructionsSrc = path.join(ghSrc, 'instructions');
    const instructionsDest = path.join(ghDest, 'instructions');
    const promptsSrc = path.join(ghSrc, 'prompts');
    const promptsDest = path.join(ghDest, 'prompts');

    if (await fs.pathExists(instructionsSrc)) {
      await fs.copy(instructionsSrc, instructionsDest, { overwrite: true });
      console.log('✅ .github/instructions ディレクトリをコピーしました');
    }
    if (await fs.pathExists(promptsSrc)) {
      await fs.copy(promptsSrc, promptsDest, { overwrite: true });
      console.log('✅ .github/prompts ディレクトリをコピーしました');
    }
    // --- ここまで追加 ---

    console.log(`✅ ${config.projectName} を生成しました`);
    console.log('\n次のステップ:');
    console.log(`  cd ${config.projectName}`);
    console.log('  pnpm install');
    console.log('  pnpm dev');
    console.log('\n※パッケージマネージャーは pnpm を使用してください');
  } catch (error) {
    console.error('プロジェクト生成に失敗しました:', error);
    process.exit(1);
  }
}

/**
 * ヘルプメッセージを表示
 */
function showHelp(): void {
  console.log(`
  使用方法: create-project <プロジェクト名>
  
  オプション:
    --help, -h     このヘルプメッセージを表示

  例:
    create-project myapp
    create-project --help
  `);
}

/**
 * メイン処理
 */
async function main(): Promise<void> {
  // ヘルプオプションをチェック
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    showHelp();
    process.exit(0);
  }

  // コマンドライン引数からプロジェクト名を取得
  const initialProjectName = getProjectNameFromArgs();
  
  // プロジェクト設定を取得
  const config = await promptForProjectConfig(initialProjectName);
  
  // テンプレートをコピー
  await copyTemplate(config);

  // --- ここから自動でprepareスクリプト追加処理 ---
  try {
    const targetPath = path.resolve(process.cwd(), config.projectName);
    const pkgPath = path.join(targetPath, 'package.json');
    if (await fs.pathExists(pkgPath)) {
      const pkg = await fs.readJson(pkgPath);
      if (!pkg.scripts) pkg.scripts = {};
      if (!pkg.scripts.prepare) {
        pkg.scripts.prepare = 'husky install';
        await fs.writeJson(pkgPath, pkg, { spaces: 2 });
        console.log('✅ package.json に "prepare": "husky install" を自動追加しました');
      }
    }
  } catch (e) {
    console.warn('package.json の prepare スクリプト自動追加に失敗:', e);
  }
  // --- ここまで追加処理 ---
}

// プログラムを実行
main().catch(error => {
  console.error('エラーが発生しました:', error);
  process.exit(1);
});
