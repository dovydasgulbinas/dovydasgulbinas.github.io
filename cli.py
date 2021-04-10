import argparse
import sys
import pathlib


class CLI:
    def __init__(self):
        parser = argparse.ArgumentParser(
            description="Allows migrating or adapting existing notes for Blogit",
            usage="""jegit.py <command> [<args>]

Commands:
   migrate\tMigrates from Jekyll to Blogit
   transform\tDoes Inline Transform for allready created and committed notes
""",
        )
        parser.add_argument("command", help="Subcommand to run")
        # parse_args defaults to [1:] for args, but you need to
        # exclude the rest of the args too, or validation will fail
        args = parser.parse_args(sys.argv[1:2])
        if not hasattr(self, args.command):
            print("Unrecognized command")
            parser.print_help()
            exit(1)
        # use dispatch pattern to invoke method with same name
        getattr(self, args.command)()

    def migrate(self):
        parser = argparse.ArgumentParser(
            description="Run all necessary steps for migration to Blogit"
        )

        parser.add_argument("-i", "--posts_dir", default="./_posts", type=pathlib.Path)
        parser.add_argument(
            "-o", "--articles_dir", default="./articles", type=pathlib.Path
        )
        parser.add_argument("-n", "--no_blogit_init", action="store_true")
        # inside a subcommand, ignore the first two args
        args = parser.parse_args(sys.argv[2:])

        if not args.posts_dir.exists() and not args.posts_dir.is_dir():
            raise Exception(
                f"Path '{args.posts_dir}' provided is not a directory or does not exist"
            )

        print(args.posts_dir, args.articles_dir, args.no_blogit_init)

    def transform(self):
        print("Not Implemented")


if __name__ == "__main__":
    CLI()
